FROM mcr.microsoft.com/playwright:v1.56.1-noble
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
USER root
RUN mkdir -p allure-results allure-report logs test-results && chown -R pwuser:pwuser /app
USER pwuser
ENV CI=true
CMD ["npx", "playwright", "test", "--project=chromium"]
