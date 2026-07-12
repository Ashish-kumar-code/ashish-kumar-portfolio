// Aggregated JSON data exporter to decouple static content from React layout logic

import profileData from './profile.json'
import experienceData from './experience.json'
import skillsData from './skills.json'
import projectsData from './projects.json'
import certificationsData from './certifications.json'
import analyticsDataObj from './analytics.json'

export const profile = profileData.profile
export const hireabilityCards = profileData.hireabilityCards

export const aboutMe = experienceData.aboutMe
export const timeline = experienceData.timeline
export const experience = experienceData.experience
export const education = experienceData.education
export const testimonials = experienceData.testimonials

export const skillsGrouped = skillsData.skillsGrouped

export const projects = projectsData.projects

export const certifications = certificationsData.certifications

export const analyticsData = analyticsDataObj.analyticsData
