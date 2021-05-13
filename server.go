package main

import (
	"context"
	"embed"
	"io/fs"
	"log"
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

func LogHTTP(handler http.Handler, logger *log.Logger) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()
		sw := statusWriter{ResponseWriter: w}
		handler.ServeHTTP(&sw, r)
		duration := time.Since(start)
		logger.Printf("Host: %s, RemoteAddr: %s, Method: %s, URI: %s, Status: %d, ResponseLength: %d, UserAgent: %s, Duration: %s\n",
			r.Host, r.RemoteAddr, r.Method, r.RequestURI, sw.status, sw.length, r.Header.Get("User-Agent"), duration,
		)
	}
}

func main() {
	port := mustReadEnv("PORT")
	listenAddr := ":" + port

	logger := log.New(os.Stdout, "gol: ", log.LstdFlags)

	files, err := fs.Sub(staticFiles, "dist")
	if err != nil {
		logger.Fatalf("Failed to substitute: %v", err)
	}

	fs := http.FileServer(http.FS(files))
	server := http.Server{Addr: listenAddr, Handler: LogHTTP(fs, logger)}

	done := make(chan bool)
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, os.Interrupt)

	go func() {
		<-quit
		logger.Println("Server is shutting down...")

		ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
		defer cancel()

		if err := server.Shutdown(ctx); err != nil {
			logger.Fatalf("Could not gracefully shutdown the server: %v\n", err)
		}
		close(done)
	}()

	logger.Printf("Server is ready to handle requests at %s", listenAddr)
	if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
		logger.Fatalf("Could not listen on %s: %v\n", listenAddr, err)
	}

	<-done
	logger.Println("Server stopped")
}
