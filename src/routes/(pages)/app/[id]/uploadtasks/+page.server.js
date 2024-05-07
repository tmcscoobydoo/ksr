
export const actions = {
    default: async(event) => {
        const { request,params, locals: { supabase } } = event
        const { id } = params;
        const form = await request.formData();
        let u_id = form.get('id')
        let name = form.get('name')
        let description = form.get('description')
        let date = form.get('date')
        let del = form.get('delete')
        console.log(u_id)
        if(del){
            try {
                const { error } = await supabase
                .from('tasks')
                .delete()
                .eq('id', del)
            } catch (error) {
                console.log(error)
            }
          
          
        }else{
            try {
                const { data, error } = await supabase
                .from('tasks')
                .insert([
                { name: name, description: description,date:date ,project:id,creator_id:u_id},
                ])
                .select()
                const task_id  = data[0].id
                console.log(data)
                return{
                    success: true,description,name,task_id
                }
            } catch (error) {
                console.log(error)
            }
            
        }
    }
    
}
