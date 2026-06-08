# Инструкция по деплою (Docker)

Для того чтобы запустить этот сервис на вашем сервере (194.87.18.116) через Docker, следуйте этой инструкции:

## 1. Подготовка сервера

Убедитесь, что на сервере установлены `git`, `docker` и `docker-compose`.
Подключитесь к вашему серверу по SSH:

```bash
ssh root@194.87.18.116
```

## 2. Клонирование репозитория

Склонируйте ваш репозиторий (так как он приватный, вам может потребоваться SSH ключ или токен доступа):

```bash
git clone git@github.com:benderobo/vpn.git /var/www/insite-panel
cd /var/www/insite-panel
git checkout feature/insite-panel
```

*(Обратите внимание: текущий код находится в ветке `feature/insite-panel`, если вы смержите его в `main`, ветку указывать не нужно).*

## 3. Проверка портов

По умолчанию контейнер использует порт `3000`. Проверьте, свободен ли он на сервере:

```bash
netstat -tuln | grep 3000
```
*или*
```bash
ss -tuln | grep 3000
```

Если порт 3000 занят, откройте файл `docker-compose.yml` и измените проброс портов:
```yaml
    ports:
      # Замените левую часть (например, на 3001 или 80)
      - "3001:3000"
```

## 4. Настройка переменных окружения

В файле `docker-compose.yml` вы можете изменить URL вашего n8n вебхука в секции `environment`:

```yaml
    environment:
      - DATABASE_URL=file:/app/prisma_data/dev.db
      - N8N_WEBHOOK_URL=https://n8n.example.com/webhook/gemini-agent
      - NODE_ENV=production
```

Замените `https://n8n.example.com/webhook/gemini-agent` на ваш реальный URL.

## 5. Запуск

Запустите сборку и старт контейнеров:

```bash
docker-compose up -d --build
```

*(Или `docker compose up -d --build` в новых версиях Docker)*

## 6. Проверка

После запуска вы можете проверить статус контейнера:

```bash
docker ps
```
И логи:
```bash
docker logs -f insite-panel
```

Сервис будет доступен по адресу `http://194.87.18.116:3000` (или по другому порту, если вы его изменили). База данных SQLite сохраняется локально в папке `prisma_data`, поэтому при перезапусках данные не потеряются.
