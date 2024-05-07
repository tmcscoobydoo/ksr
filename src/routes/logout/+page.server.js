import { redirect } from "@sveltejs/kit"

export const load = async({locals: { supabase }}) =>{
    let { error } = await supabase.auth.signOut()
    console.log('logged out')
    throw redirect(307, '/');
}