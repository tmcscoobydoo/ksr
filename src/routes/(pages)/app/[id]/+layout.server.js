import { redirect } from "@sveltejs/kit";

export const load = async ({params,locals:{supabase}}) => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user){
        throw redirect(307,'/login')
    }else{
        const { id } = params;
        let tasks;
        let users = [];
        let freinds ;
        
        try {
            let { data, error } = await supabase
            .from('tasks')
            .select('*')
            .eq('project', id)
            tasks=data
        } catch (error) {
            console.log(error)
        }
        for (let i = 0; i < tasks.length; i++) {
            try{
                let { data, error } = await supabase
                .from('users')
                .select('*')
                .eq('id',tasks[i].creator_id)
        
                if (!users.some(user => user.id === tasks[i].creator_id)) {
                    delete data[0].uuid;
                    users.push(data[0]);
                }
               
                users = users
            }catch(error){
                console.log(error)
            }
            
        }
        try {
            
            const { data, error } = await supabase
            .from('users')
            .select('freinds')
            .eq('uuid', user.id)
            freinds = data[0].freinds
        } catch (error) {
            console.log(error)
        }
        try {
            const { data, error } = await supabase
            .from('users')
            .select('*')
            .in('id', freinds)
            freinds = data
    
        } catch (error) {
            console.log(error)
        }
        freinds = freinds.map(obj => {
            let newObj = {...obj};
            delete newObj.uuid;
            return newObj;
        });
        try{
            let { data: projects, error } = await supabase
            .from('projects')
            .select('*')
            .eq('id',id)
            return{
                project:projects[0] || false,
                tasks:tasks || [],
                users,freinds
            }
            
        }catch(error){
            console.log(error)
        }
    }
   
    
    

}
