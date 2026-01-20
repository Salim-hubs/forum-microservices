# Etape 1--> Build de l'application Angular                                                       
  FROM node:20-alpine AS builder                                                                  
  WORKDIR /app                                                                                    
  COPY package*.json ./                                                                           
  RUN npm install                                                                                 
  COPY . .                                                                                        
  RUN npm run build                                                                               
                                                                                                  
  # Etape 2--> Serveur Nginx pour servir les fichiers statiques                                     
  FROM nginx:alpine                                                                               
  COPY --from=builder /app/www /usr/share/nginx/html                                              
  COPY nginx.conf /etc/nginx/conf.d/default.conf                                                  
  EXPOSE 80                                                                                       
  CMD ["nginx", "-g", "daemon off;"] 