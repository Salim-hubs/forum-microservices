# Image de base Node.js (version legere Alpine)                                                 
  FROM node:20-alpine                                                                             
                                                                                                  
  # Dossier de travail dans le container                                                          
  WORKDIR /app                                                                                    
                                                                                                  
  # Copier les fichiers de dependances d'abord (pour le cache Docker)                             
  COPY package*.json ./                                                                           
                                                                                                  
  # Installer les dependances                                                                     
  RUN npm install --production                                                                    
                                                                                                  
  # Copier le reste du code                                                                       
  COPY . .                                                                                        
                                                                                                  
  # Port expose par le service                                                                    
  EXPOSE 3001                                                                                     
                                                                                                  
  # Commande pour lancer le service                                                               
  CMD ["node", "server.js"]  