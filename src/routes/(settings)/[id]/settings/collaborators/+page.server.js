export const actions = {
    default: async({request,locals:{supabase},params})=>{
        const form = await request.formData();
        const invited = JSON.parse(form.get('invited'))
        const {id} = params
        if (invited.length > 0) {
            let admins = [];
            try {
                const {data,error} = await supabase.from('projects').select('admins')
                admins = [...new Set([...invited, ...data[0].admins])];
                admins = admins
            } catch (error) {
                console.log(error)
            }
            try {
                
                const { data, error } = await supabase
                .from('projects')
                .update({admins: admins})
                .eq('id', id)
                .select()
            } catch (error) {
                console.log(error)
            }
        }
        
    }
}