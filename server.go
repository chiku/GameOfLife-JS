package main

import (
	"context"
	"embed"
	"io/fs"
	"log/slog"
	"net/http"
	"os"
	"os/signal"
	"time"
)

//go:embed dist/*
var staticFiles embed.FS

func mustReadEnv(name string) string {
	if v := os.Getenv(name); v != "" {
		return v
	}
	panic(name + " not set as an environment variable")
}

type statusWriter struct {
	http.ResponseWriter
	status int
	length int
}

func (w *statusWriter) WriteHeader(status int) {
	w.status = status
	w.ResponseWriter.WriteHeader(status)
}

func (w *statusWriter) Write(b []byte) (int, error) {
	if w.status == 0 {
		w.status = 200
	}
	n, err := w.ResponseWriter.Write(b)
	w.length += n
	return n, err
}

func LogHTTP(handler http.Handler, logger *slog.Logger) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()
		sw := statusWriter{ResponseWriter: w}
		handler.ServeHTTP(&sw, r)
		duration := time.Since(start)
		logger.Info("Handled request", "Host", r.Host, "RemoteAddr", r.RemoteAddr, "Method", r.Method, "URI", r.RequestURI,
			"Status", sw.status, "ResponseLength", sw.length, "UserAgent", r.Header.Get("User-Agent"), "Duration", duration)
	}
}

func main() {
	port := mustReadEnv("PORT")
	listenAddr := ":" + port

	logger := slog.New(slog.NewTextHandler(os.Stdout, nil))

	files, err := fs.Sub(staticFiles, "dist")
	if err != nil {
		logger.Error("Failed to substitute", "error", err)
		os.Exit(1)
	}

	fs := http.FileServer(http.FS(files))
	server := http.Server{Addr: listenAddr, Handler: LogHTTP(fs, logger)}

	done := make(chan bool)
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, os.Interrupt)

	go func() {
		<-quit
		logger.Info("Server is shutting down...")

		ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
		defer cancel()

		if err := server.Shutdown(ctx); err != nil {
			logger.Error("Could not gracefully shutdown the server", "error", err)
			os.Exit(1)
		}
		close(done)
	}()

	logger.Info("Server is ready to handle requests", "address", listenAddr)
	if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
		logger.Error("Could not listen", "address", listenAddr, "error", err)
		os.Exit(1)
	}

	<-done
	logger.Info("Server stopped")
}
