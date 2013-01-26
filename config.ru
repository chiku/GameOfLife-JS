map "/" do
  use Rack::Static, :urls => [""], :root => "public", :index => "index.html"

  run lambda { |env|
    headers = {
      "Content-Type"  => "text/html",
      "Cache-Control" => "public, max-age=86400"
    }
    body = File.open("public/index.html", File::RDONLY).read

    [200, headers, [body]]
  }
end
