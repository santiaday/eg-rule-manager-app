package com.example.Excel2Json.service;

import com.example.Excel2Json.exceptions.FileStorageException;
import com.example.Excel2Json.exceptions.MyFileNotFoundException;
import com.example.Excel2Json.property.FileStorageProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
public class FileStorageService {

    private final Path fileStorageLocation;

    @Autowired
    public FileStorageService(FileStorageProperties fileStorageProperties) {
        this.fileStorageLocation = Paths.get(System.getProperty("user.dir") + System.getProperty("file.separator") + "uploadedFiles")
                .toAbsolutePath().normalize();

        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
            throw new FileStorageException("Could not create the directory where the uploaded files will be stored.", ex);
        }
    }

    public String storeFile(MultipartFile file) {
        // Normalize file name
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());

        try {
            // Check if the file's name contains invalid characters
            if(fileName.contains("..")) {
                throw new FileStorageException("Sorry! Filename contains invalid path sequence " + fileName);
            }

            // Copy file to the target location (Replacing existing file with the same name)
            Path targetLocation = this.fileStorageLocation.resolve(fileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            return fileName;
        } catch (IOException ex) {
            throw new FileStorageException("Could not store file " + fileName + ". Please try again!", ex);
        }
    }

    public Resource loadFileAsResource(String fileName) {
        try {
            Path filePath = this.fileStorageLocation.resolve(fileName).normalize();
            Resource resource = new UrlResource(filePath.toUri());
            System.out.println(resource);
            if(resource.exists()) {
                System.out.println("File found");
                return resource;
            } else {
                System.out.println("File not found");
                throw new MyFileNotFoundException("File not found " + fileName);
            }
        } catch (MalformedURLException ex) {
            throw new MyFileNotFoundException("File not found " + fileName, ex);
        }
    }

    public Resource loadRuleAsResource(String fileName) {
        try {
            Path filePath = Paths.get(System.getProperty("user.dir") + System.getProperty("file.separator") + "rulesStorage" + System.getProperty("file.separator") +  fileName);
            Resource resource = new UrlResource(filePath.toUri());
            if(resource.exists()) {
                System.out.println("File found");
                return resource;
            } else {
                System.out.println("File not found" + fileName);
                throw new MyFileNotFoundException("File not found " + fileName);
            }
        } catch (MalformedURLException ex) {
            throw new MyFileNotFoundException("File not found " + fileName, ex);
        }
    }

    public Resource loadExcelAsResource(String fileName) {
        try {
            Path filePath = Paths.get(System.getProperty("user.dir") + System.getProperty("file.separator") + fileName);
            System.out.println(filePath);
            Resource resource = new UrlResource(filePath.toUri());
            if(resource.exists()) {
                System.out.println("File found");
                return resource;
            } else {
                System.out.println("File not found" + fileName);
                throw new MyFileNotFoundException("File not found " + fileName);
            }
        } catch (MalformedURLException ex) {
            throw new MyFileNotFoundException("File not found " + fileName, ex);
        }
    }
}