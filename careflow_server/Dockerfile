# Stage 1: Build the Serverpod Dart server
FROM dart:stable AS build

WORKDIR /app
COPY pubspec.* ./
RUN dart pub get

COPY . .
RUN dart compile exe bin/main.dart -o bin/server

# Stage 2: Create production runtime image
FROM debian:bookworm-slim

RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    curl \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY --from=build /app/bin/server /app/bin/server
COPY --from=build /app/config/ /app/config/

ENV runmode=production
ENV GEMINI_API_KEY=""

EXPOSE 8080 8081 8082

CMD ["/app/bin/server", "--mode", "production"]
