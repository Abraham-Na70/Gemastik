# Gunakan Python versi slim
FROM python:3.12.10-slim

# Set environment agar Python tidak menulis bytecode dan log lebih bersih
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Buat direktori kerja
WORKDIR /app

# Salin file requirements terlebih dahulu (agar caching efektif)
COPY requirements.txt . /app/

# Upgrade pip dan install dependensi
RUN pip install --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Salin seluruh kode aplikasi
COPY . /app

EXPOSE 5000

# Jalankan aplikasi Flask
CMD ["python", "main.py"]
