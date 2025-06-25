FROM gradle:8.5-jdk21 AS build
WORKDIR /app
COPY *.gradle* ./
COPY src ./src
RUN gradle build -x test

FROM openjdk:21-jdk-slim
WORKDIR /app
COPY --from=build /app/build/libs/*.jar app.jar
EXPOSE 8088
ENTRYPOINT ["java", "-jar", "app.jar"]