import { createBrowserClient ,isBrowser , parse} from '@supabase/ssr';


let VITE_SUPABASE_URL = 'https://sjjjwxajgjqxoyrqdeww.supabase.co'
let VITE_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNqamp3eGFqZ2pxeG95cnFkZXd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDMwODY4NzQsImV4cCI6MjAxODY2Mjg3NH0.td09kIXRKF9mMrWg7BDIFg4wMflE6MT3FN-snGqkDXQ'
export const load = async ({ fetch, data, depends }) => {
  depends('supabase:auth');

  const supabase = createBrowserClient(VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY, {
    global: {
      fetch,
    },
    cookies: {
      get(key) {
        if (!isBrowser()) {
          return JSON.stringify(data.session);
        }

        const cookie = parse(document.cookie);
        return cookie[key];
      },
    },
  });

  const { data: { session } } = await supabase.auth.getSession();
  const { data: { user } } = await supabase.auth.getUser()
  if (user){

    let { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('uuid',user.id)
    
    
    return {

      loggedUser: data[0],
      supabase, session
      
    }
  }
  

  return {
    loggedUser: user,
    supabase, session
    
  }
 
};
