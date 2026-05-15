# Stage 1: Build the application with Maven
FROM eclipse-temurin:17-jdk-alpine AS build

WORKDIR /app

# Copy Maven wrapper and pom.xml first for dependency caching
COPY pom.xml ./
COPY .mvn .mvn
COPY mvnw ./
RUN chmod +x mvnw && ./mvnw dependency:resolve

# Copy source code and build
COPY src ./src
RUN ./mvnw package -DskipTests

# Stage 2: Run the application
FROM eclipse-temurin:17-jre-alpine

LABEL maintainer="quizzapp"

WORKDIR /app

# Copy the built JAR from the build stage
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
