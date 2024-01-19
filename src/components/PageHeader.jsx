import {ElPageHeader} from 'element-plus'
import {defineComponent} from 'vue'
import { useRouter } from 'vue-router'



export default defineComponent({
  setup(props,{slots}){
    const router = useRouter()
    const onBack = ()=>{
      router.back()
    }
    return ()=> <ElPageHeader {...props} onBack={onBack}>
      {slots}
    </ElPageHeader>
  }
})