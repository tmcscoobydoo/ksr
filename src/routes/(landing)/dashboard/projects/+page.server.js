import { redirect } from "@sveltejs/kit";


export const actions = {
    default: async(event) => {
        const {request,locals:{supabase}} = event
        const form = await request.formData();
        let name = form.get('name')
        let pwd = form.get('pwd')
        let members = form.get('members')
        members = JSON.parse(members)
        try{
            const { data, error } = await supabase
            .from('projects')
            .insert([
            { name: name , members:members,project_pwd:pwd },
            ])
            .select()
            console.log(error)
            console.log(data)
        }catch(error){
            console.log(error)
        }
        
    }
}
export const load = async({locals:{supabase}}) => {
    
    const { data: { user } } = await supabase.auth.getUser()
 
    if (!user){
        
        throw redirect(307,'/login')
    }else{
        try {
        
            let { data: projects, error } = await supabase
            .from('projects')
            .select('*')

            return{
                projects:projects || []
            }
    
        } catch (error) {
            console.log(error)
        }
    }
    
}