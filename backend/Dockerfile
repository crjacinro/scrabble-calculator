# ---- Build stage ----
FROM gradle:8.8-jdk21-alpine AS build
WORKDIR /workspace

# Cache dependencies first
COPY build.gradle.kts settings.gradle.kts ./
COPY gradle gradle
COPY gradlew .
RUN ./gradlew --version

# Copy sources and build
COPY src src
RUN ./gradlew clean bootJar -x test

# ---- Run stage ----
FROM eclipse-temurin:21-jre-alpine
ENV JAVA_OPTS=""
WORKDIR /app

# Ensure H2 file database path is writable
RUN mkdir -p /app/data
VOLUME ["/app/data"]

# Copy the built jar
COPY --from=build /workspace/build/libs/*.jar /app/app.jar

EXPOSE 8080
ENTRYPOINT ["sh","-c","java $JAVA_OPTS -jar /app/app.jar"] 