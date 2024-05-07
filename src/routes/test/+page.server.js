import { createCanvas  } from "canvas";
import { promises as fs  } from "fs";

export const actions = {
    default: async(event) => {
        const { request, locals: { supabase } } = event
        const form = await request.formData();
        
        async function createImage(name) {
            // Create a canvas element
            const canvas = createCanvas(500, 500);

            // Get the context
            const ctx = canvas.getContext('2d');

            // Generate a random color for the background
            const bgColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
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
            .upload('avatar1.png', buffer, {
                contentType: 'image/png',
                cacheControl: '3600',
                upsert: false
            })
        }
        await createImage('adam');
    }
}
