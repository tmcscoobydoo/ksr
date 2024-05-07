export const load = async({locals:{supabase},params})=>{
    const {user} = params
    let { data:messages, error } = await supabase.rpc('get_messages', { user_id: user })
    messages = messages.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    try {
        const {data,error} = await supabase.from('users').select('*').eq('id',user)
        delete data[0].uuid
        return{
            user:data[0],
            messages 
        }
    } catch (error) {
        console.log(error)
    }
    
}
export const actions = {
    default: async(event) => {
        const { request, locals: { supabase },params } = event
        const form = await request.formData();
        const message = form.get('message')
        const me = form.get('me')
        console.log(me)
        const {user} = params
        if(message.length > 0){
            try {
                
                const { data, error } = await supabase
                .from('messages')
                .insert([
                { message: message, receiver: user , sender:me },
                ])
                .select()
                
            } catch (error) {
                console.log('error in sending message')
            }
        }
    }
}
