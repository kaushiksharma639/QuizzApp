# Use an official Eclipse Temurin JDK 17 image as the base
FROM eclipse-temurin:17-jdk-alpine

# Maintainer info
LABEL maintainer="quizzapp"

# Add a volume pointing to /tmp
VOLUME /tmp

# Make port 8080 available to the world outside this container
EXPOSE 8080

# The application's jar file is expected to be built and placed in the target directory
ARG JAR_FILE=target/*.jar

# Copy the application's jar to the container
COPY ${JAR_FILE} app.jar

# Run the jar file
ENTRYPOINT ["java","-jar","/app.jar"]
