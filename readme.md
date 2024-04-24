postgres di local : docker-compose -f docker-compose.yml up -d --build

init prisma = npx prisma init --datasource-provider postgresql
generate prisma = npx prisma generate
push ke db = npx prisma db push
liat db prisma studio = npx prisma studio