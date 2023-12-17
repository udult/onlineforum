### Для корректной работы системы:
**в файле PHP_8.1_php раскомментировать строки:**
- extension = pdo_pgsql
- extension = pgsql\
в файле PostgreSQL-10_postgresql.conf редактировать строку:
- password_encryption = scram-sha-256\
**в файле PostgreSQL-10_pg_hba.conf редактировать строки:**
- host &nbsp; all &nbsp; all &nbsp; 0.0.0.0/0 &nbsp; scram-sha-256
- host &nbsp; all &nbsp; all &nbsp; ::/0 &nbsp; scram-sha-256
