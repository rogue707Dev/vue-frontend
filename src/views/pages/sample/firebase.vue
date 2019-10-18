<template>
  <div>firebase sample</div>
</template>
<script>
import { getDb } from '@/utils/firebase'
export default {
  name: 'FireBaseSample',
  setup () {
    const db = getDb()
    // firebase sample
    if (db !== null) {
      db.ref('/menu2').set({
        name: '燒肉',
        price: 50,
        desc: '燒肉飯'
      }).then(() => {
        console.log('新增成功')
      }).catch(e => {
        console.log('error')
        console.log(e)
      })
    }
  }
}
</script>
