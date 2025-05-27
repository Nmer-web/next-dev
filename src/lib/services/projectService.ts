import { databases, storage, DATABASE_ID, COLLECTIONS, BUCKETS } from '../appwrite';
import { ID, Query, Models } from 'appwrite';

export interface Project {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    technologies: string[];
    category: string;
    clientName: string;
    completionDate: string;
    liveUrl?: string;
    githubUrl?: string;
    featured: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export const projectService = {
    // Get all projects
    async getProjects(limit = 10, offset = 0) {
        try {
            return await databases.listDocuments(
                DATABASE_ID,
                COLLECTIONS.PROJECTS,
                [
                    Query.limit(limit),
                    Query.offset(offset),
                    Query.orderDesc('createdAt')
                ]
            );
        } catch (error) {
            console.error('Error getting projects:', error);
            throw error;
        }
    },

    // Get project by ID
    async getProjectById(id: string) {
        try {
            return await databases.getDocument(
                DATABASE_ID,
                COLLECTIONS.PROJECTS,
                id
            );
        } catch (error) {
            console.error('Error getting project:', error);
            throw error;
        }
    },

    // Create new project
    async createProject(project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) {
        try {
            return await databases.createDocument(
                DATABASE_ID,
                COLLECTIONS.PROJECTS,
                ID.unique(),
                {
                    ...project,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                }
            );
        } catch (error) {
            console.error('Error creating project:', error);
            throw error;
        }
    },

    // Update project
    async updateProject(id: string, project: Partial<Project>) {
        try {
            return await databases.updateDocument(
                DATABASE_ID,
                COLLECTIONS.PROJECTS,
                id,
                {
                    ...project,
                    updatedAt: new Date().toISOString()
                }
            );
        } catch (error) {
            console.error('Error updating project:', error);
            throw error;
        }
    },

    // Delete project
    async deleteProject(id: string) {
        try {
            return await databases.deleteDocument(
                DATABASE_ID,
                COLLECTIONS.PROJECTS,
                id
            );
        } catch (error) {
            console.error('Error deleting project:', error);
            throw error;
        }
    },

    // Upload project image
    async uploadProjectImage(file: File) {
        try {
            const response = await storage.createFile(
                BUCKETS.PROJECT_IMAGES,
                ID.unique(),
                file
            );
            return response;
        } catch (error) {
            console.error('Error uploading image:', error);
            throw error;
        }
    },

    // Get project image URL
    getProjectImageUrl(fileId: string) {
        return storage.getFileView(BUCKETS.PROJECT_IMAGES, fileId);
    },

    async getFeaturedProjects() {
        try {
            return await databases.listDocuments(
                DATABASE_ID,
                COLLECTIONS.PROJECTS,
                [
                    Query.equal('featured', true),
                    Query.limit(6),
                    Query.orderDesc('createdAt')
                ]
            );
        } catch (error) {
            console.error('Error getting featured projects:', error);
            throw error;
        }
    }
}; 