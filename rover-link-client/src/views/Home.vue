<template>
    <div>
          <Header />
          <Dashboard />
    </div>

</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header'
import Dashboard from "@/components/Dashboard"

export default {
  name: 'home',
  components: {
      Header,
      Dashboard

  }
}
</script>
