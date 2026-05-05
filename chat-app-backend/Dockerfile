# Step 1: Build the JAR using Maven with JDK 21
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app
# Copy the pom and source code
COPY . .
RUN mvn clean package -DskipTests

# Step 2: Run the JAR using JRE 21
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
# Copy the JAR from the 'build' stage
COPY --from=build /app/target/chat-app-backend-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
