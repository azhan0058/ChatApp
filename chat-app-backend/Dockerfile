# Step 1: Build the JAR using Maven
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app
# Copy the pom and source code
COPY . .
RUN mvn clean package -DskipTests

# Step 2: Run the JAR using JDK 21 (Alpine is very slim and reliable)
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
# Copy the JAR from the 'build' stage
COPY --from=build /app/target/chat-app-backend-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
