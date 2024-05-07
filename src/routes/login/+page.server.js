import { fail, redirect } from "@sveltejs/kit";


export const actions = {
    // login:async(event)=>{
    //     const { locals: { supabase } ,url} = event
    //     const provider = url.searchParams.get("provider")
    //     const { data, error } = await supabase.auth.signInWithOAuth({
    //         provider:provider
           
    //     })
    //     // if (!error){
    //     //     throw redirect(303,`${data.url}`)
    //     // }
    // },
    default: async(event) => {
        const { request, locals: { supabase } ,url} = event
        const form = await request.formData();
        const email = form.get('email')
        const pwd = form.get('pwd')
        
    
            if (!email) {
                return fail(400 , { message: 'email is missing',success:false});
            }
            if (!pwd) {
                return fail(400 , { message: 'password is missing',success:false,email});
            }
            try {
                
                let { data, error } = await supabase.auth.signInWithPassword({
                    email: email,
                    password: pwd
                    
                })
                if (error) {
                    return fail(400, {message: 'invalid account',success:false})
                    
                }             
      
            } catch (error) {
                console.log(error)
            }
  
            return{
                message: 'loging in!!',
                success: true
            }
       
    }
}