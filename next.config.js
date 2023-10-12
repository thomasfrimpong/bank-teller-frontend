/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler: {
        styledComponents: true,
      },
      env: {
        BASE_URL: process.env.BASE_URL,
        JWT_SECRET:process.env.JWT_SECRET,
        NEXTAUTH_SECRET:process.env.NEXTAUTH_SECRET
      }
}

module.exports = nextConfig
