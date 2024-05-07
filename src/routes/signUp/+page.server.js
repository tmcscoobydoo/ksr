import { error, fail } from "@sveltejs/kit";
import { createCanvas  } from "canvas";


export const actions = {
    default: async(event) => {
        const { request, locals: { supabase } } = event
        const form = await request.formData();
        const name = form.get('fullName')
        const email = form.get('email')
        const pwd = form.get('pwd')
        let message;
        let profile;
        let bgColor;
        async function createImage(name,id) {
            // Create a canvas element
            const canvas = createCanvas(500, 500);

            // Get the context
            const ctx = canvas.getContext('2d');

            // Generate a random color for the background
            bgColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
            Math.random() * 256
            )}, ${Math.floor(Math.random() * 256)})`;

            // Set the background color
            ctx.fillStyle = bgColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Set the text color, font, and alignment
            ctx.fillStyle = "#FFFFFF"; // White text
            ctx.font = "bold 350px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            // Draw the name on the canvas
            ctx.fillText(name[0].toUpperCase(), canvas.width / 2, canvas.height / 2);

            // Convert the canvas to a Buffer
            let buffer = canvas.toBuffer('image/png');
            const { data, error } = await supabase
            .storage
            .from('profiles')
            .upload(`${id}/profile`, buffer, {
                contentType: 'image/png',
                cacheControl: '3600',
                upsert: false
            })
        }
      
        if (!name) {
            return fail(400 , { message: 'name is missing' ,success:false ,email});
        }
        if (!email) {
            return fail(400 , { message: 'email is missing',success:false ,name});
        }
        if (!pwd) {
            return fail(400 , { message: 'password is missing',success:false ,name,email});
        }
        
        let user_id = ''
      
        try {
            let { data, error } = await supabase.auth.signUp({
                email: email,
                password: pwd
                
            })
            console.log(data ,error)
            user_id = data?.user.id
        } catch (error) {
            console.log(error)
            message = `message: ${error}`
            
        }
        await createImage(name,user_id)
        try {
            
            const { data } = supabase
            .storage
            .from('profiles')
            .getPublicUrl(`${user_id}/profile`)
            profile = data.publicUrl
        } catch (error) {
            
        }
        try {
            
            const { data, error } = await supabase
            .from('users')
            .insert([
                { email: email, full_name: name,uuid: user_id ,profile_color:bgColor,profile_pic:profile},
            ])
            .select()
 
            if (data) {
                return{
                    message: 'account created!!',
                    success: true
                }
            }
        } catch (error) {
            console.log(error)
            message = `message: ${error}`
        }
        
        return{
            message : message,
            success : false
        }
       
    }
}