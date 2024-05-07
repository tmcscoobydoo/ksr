// import { fail } from "@sveltejs/kit";

import { user_data } from "$lib/stores";
let data_user = false
user_data.subscribe(v => {
    data_user = v
})

let new_photo = false

export const actions = {
    default: async(event) => {
        const {request,locals: { supabase } } = event	
        const form = await request.formData();
        const email = form.get('email')
        const name = form.get('name')
        const pic = form.get('pic')

        await supabase.storage.from('files').upload(`avatars/${data_user.uuid}`, pic, {
            contentType: pic.type,
        })
        // if (pic.name !== 'undefined') {
        //     console.log('step1')
        //     if (user_data.profile_pic == undefined){
        //         console.log('step2')
        //         try {
        //             console.log('uuid: ',data_user.uuid)
        //             console.log('type',pic.type)
        //             await supabase.storage.from('files').upload(`avatars/${data_user.uuid}`, pic, {
        //                 contentType: pic.type,
        //             })
        //             new_photo = true
        //             console.log('step3')
        //         } catch (error) {
        //             new_photo = false
        //             console.log(error)
        //         }
        //         if (new_photo){
        //             console.log('step4')
        //             const { data:url, urlError } = await supabase.storage.from('files').getPublicUrl(`avatars/${data_user.uuid}`);
                 
        //             if (url.publicUrl !== data_user.profile_pic){
        //                 console.log('step5')
        //                 try {
        //                     const { data, error } = await supabase
        //                     .from('users')
        //                     .update({ profile_pic: url.publicUrl })
        //                     .eq('uuid', data_user.uuid)
        //                     .select()
                    
        //                     console.log('step6')
        //                 } catch (error) {
        //                     console.log(error)
        //                 }
                        
                       
        //             }
                
        //         }
        //         console.log('stoped')
        //     }else{
        //         try {
        //             const { data, error } = await supabase
        //             .storage
        //             .from('files')
        //             .remove([`avatars/${data_user.uuid}`])
        //             new_photo = true
        //         } catch (error) {
        //             new_photo = false
        //             console.log(error)
        //         }
        //         if (new_photo){
        //             try {
        //                 await supabase.storage.from('files').upload(`avatars/${data_user.uuid}`, pic, {
        //                     contentType: pic.type,
        //                 })
        //                 console.log('img updated')
        //             } catch (error) {
        //                 console.log(error)
        //             }
        //         }
        //     }
  
        // }
        
        // try {
        //     const { data, error } = await supabase.auth.updateUser({
        //       email: email,
             
        //     })
        //   console.log('chnaging account')
            
        // } catch (error) {
        //     console.log(error)
        // }
        
        // return{
        //     message: 'loging in!!',
        //     success: true
        // } 
        console.log('done')
    }
    
}