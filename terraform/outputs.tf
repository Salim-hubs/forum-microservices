output "instance_public_ip" {                                                                   
    description = "IP publique de l'instance EC2"                                                 
    value       = aws_instance.forum_server.public_ip                                             
  }                                                                                               
                                                                                                  
  output "instance_public_dns" {                                                                  
    description = "DNS public de l'instance EC2"                                                  
    value       = aws_instance.forum_server.public_dns                                            
  }                                                                                               
                                                                                                  
  output "ssh_command" {                                                                          
    description = "Commande SSH pour se connecter"                                                
    value       = "ssh -i ${var.key_name}.pem ec2-user@${aws_instance.forum_server.public_ip}"    
  }