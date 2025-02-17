-- Create author table
CREATE TABLE IF NOT EXISTS author (
    id SERIAL PRIMARY KEY,
    "firstName" VARCHAR NOT NULL,
    "lastName" VARCHAR NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create blog table
CREATE TABLE IF NOT EXISTS blog (
    id SERIAL PRIMARY KEY,
    title VARCHAR NOT NULL,
    category VARCHAR NOT NULL,
    content VARCHAR NOT NULL,
    "imageUrl" VARCHAR,  -- Make sure this matches the entity definition
    "authorId" INTEGER REFERENCES author(id),
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create author
INSERT INTO author ("firstName", "lastName", "createdAt", "updatedAt")
VALUES 
('John', 'Doe', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Create blogs
INSERT INTO blog (title, category, content, "authorId", "imageUrl", "createdAt", "updatedAt")
VALUES 
('Getting Started with Docker', 
 'Technology', 
 'Docker is a platform for developing, shipping, and running applications in containers. It provides a way to package applications with all their dependencies into standardized units called containers. These containers can run consistently across different environments, making deployment easier and more reliable.', 
 1,
 'https://picsum.photos/800/400',
 CURRENT_TIMESTAMP,
 CURRENT_TIMESTAMP),
('Kubernetes Fundamentals', 
 'DevOps', 
 'Kubernetes is an open-source container orchestration platform that automates the deployment, scaling, and management of containerized applications. It provides features like automatic scaling, self-healing, load balancing, and service discovery.', 
 1,
 'https://picsum.photos/800/401',
 CURRENT_TIMESTAMP,
 CURRENT_TIMESTAMP),
('CI/CD Best Practices', 
 'DevOps', 
 'Continuous Integration and Continuous Deployment (CI/CD) are essential practices in modern software development. CI ensures that code changes are automatically built, tested, and integrated into the main codebase.', 
 1,
 'https://picsum.photos/800/402',
 CURRENT_TIMESTAMP,
 CURRENT_TIMESTAMP); 