variable "aws_region" {                                                                         
    description = "Region AWS"                                                                    
    default     = "us-east-1"                                                                     
  }                                                                                               
                                                                                                  
  variable "ami_id" {                                                                             
    description = "AMI Amazon Linux 2023"                                                         
    default     = "ami-0c02fb55956c7d316"                                                         
  }                                                                                               
                                                                                                  
  variable "instance_type" {                                                                      
    description = "Type d'instance EC2"                                                           
    default     = "t2.micro"                                                                      
  }                                                                                               
                                                                                                  
  variable "key_name" {                                                                           
    description = "Nom de la cle SSH"                                                             
    type        = string                                                                          
  }