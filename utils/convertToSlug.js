export const convertToSlug = str => {
   // Step 1: Convert to lowercase
   str = str.toLowerCase();

   // Step 2: Replace spaces with hyphens
   str = str.replace(/\s+/g, '-');
 
   // Step 3: Remove special characters
   str = str.replace(/[^\w-]/g, '');
 
   return str; 
}
