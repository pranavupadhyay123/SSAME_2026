# How to Setup Vercel Postgres for the Contact Form

I have successfully updated the code so that your Contact form connects to a database!
Because your site is hosted on **Vercel**, we used **Vercel Postgres SDK** and **Serverless Functions** (in the `api/` folder).

However, the database won't exist until you create it in your Vercel Dashboard. Follow these simple steps:

1. **Push this code to GitHub:** Ensure the latest code (with `package.json`, the `api/` folder, and the updated `assets/js/script.js`) is pushed to your `main` branch so Vercel builds it.
2. **Open Vercel Dashboard:** Log in to your Vercel account and click on the `SSAME_2026` project.
3. **Go to Storage:** Click on the **Storage** tab at the top of the project dashboard.
4. **Create a Database:**
   - Click **Create Database** or **Select Existing** if you already made one.
   - Under **Marketplace Database Providers**, select **Neon (Serverless Postgres)**. Vercel recently moved their native Postgres offering to Neon.
   - Follow the prompts to create the database (the free defaults are perfectly fine).
5. **Connect the Database:** Make sure you link the newly created Neon database to your `SSAME_2026` project. This automatically injects the necessary environment variables (like `POSTGRES_URL` or `DATABASE_URL`) into your project.
6. **Redeploy:** Go to the Deployments tab and redeploy the latest commit, OR just push another small commit to GitHub to trigger a fresh build.
7. **Test it!** Go to your live URL, submit the contact form, and it will automatically create the `messages` table and save your entry! You can view the entries under the **Storage** > **Data** tab in Vercel.
