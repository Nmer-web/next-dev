// import { databases, storage, DATABASE_ID, COLLECTIONS, BUCKETS } from '../appwrite'; // Removed Appwrite imports
// import { ID, Query, Models } from 'appwrite'; // Removed Appwrite imports

export interface Project { // Keep interface for expected data structure
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    technologies: string[];
    category: string;
    clientName: string;
    completionDate: string; // Assuming date is returned as string
    liveUrl?: string;
    githubUrl?: string;
    featured: boolean;
    createdAt: string; // Assuming date is returned as string
    updatedAt: string; // Assuming date is returned as string
}

export const projectService = {
    // Get all projects from the backend
    async getProjects(): Promise<Project[]> { // Removed limit and offset parameters, changed return type
        try {
            console.log('Fetching projects from backend...');
            const response = await fetch('/api/projects'); // Use the new backend endpoint

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to fetch projects from backend');
            }

            const projects: Project[] = await response.json(); // Assuming backend returns an array of Project objects
            console.log('Projects fetched successfully:', projects);
            return projects;
        } catch (error) {
            console.error('Error getting projects:', error);
            if (error instanceof Error) {
                throw new Error(`Failed to get projects: ${error.message}`);
            }
            throw new Error('Failed to get projects');
        }
    },

    // Removed Appwrite-specific functions:
    // getProjectById,
    // createProject,
    // updateProject,
    // deleteProject,
    // uploadProjectImage,
    // getProjectImageUrl,
    // getFeaturedProjects (backend needs to support filtering for featured)
}; 