<script setup lang="ts">
import { createError } from 'h3';

throw createError({
  statusCode: 404,
  statusMessage: 'Halaman tidak ditemukan'
});
</script>
