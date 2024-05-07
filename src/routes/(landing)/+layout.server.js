export const load = async ({ locals: { supabase } }) => {
    
    let users
    try {
        
        let { data, error } = await supabase.rpc('get_users_count')
        users = data

    } catch (error) {
        console.log(error)
    }
    return {
        allUsers : users || []
    }
    
}
  