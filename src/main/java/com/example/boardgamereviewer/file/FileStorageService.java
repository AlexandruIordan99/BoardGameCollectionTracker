package com.example.boardgamereviewer.file;


import com.example.boardgamereviewer.boardGame.BoardGame;
import jakarta.annotation.Nonnull;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import static java.io.File.separator;
import static java.lang.System.currentTimeMillis;

@Service
@RequiredArgsConstructor
@Slf4j //logger
public class FileStorageService {

    @Value("${application.file.upload.photos-output-path}") //connects to the photos upload path in application-dev.yml
    private String fileUploadPath;

    public String saveFile(@Nonnull MultipartFile sourceFile,
                           @NonNull BoardGame boardGame,
                            @NonNull Integer userId) {
        final String fileUploadSubpath = "users" + separator + userId;
        return uploadFile(sourceFile, fileUploadSubpath);

    }

    private String uploadFile(
            @Nonnull MultipartFile sourceFile,
            @NonNull String fileUploadSubpath) {
        final String finalUploadPath = fileUploadPath + separator + fileUploadSubpath;
        File targetFolder = new File(finalUploadPath);
        if (!targetFolder.exists()) {
            boolean folderCreated = targetFolder.mkdirs(); //mkdirs creates folders AND subfolders
            if (!folderCreated) {
                log.warn("Failed to create the target folder");
                return null;
            }
        }
        final String fileExtension = getFileExtension(sourceFile.getOriginalFilename());
        //time helps create different file names
        String targetFilePath = finalUploadPath + separator + currentTimeMillis()+ fileExtension;
        Path targetPath = Paths.get(targetFilePath);

        try{
            Files.write(targetPath, sourceFile.getBytes());
            log.info("File saved to " + targetFilePath);
            return targetFilePath;
        } catch (IOException e) {
            log.error("Failed to write file", e);
        }
        return null;
    }

    private String getFileExtension(String fileName) {
        if (fileName == null || fileName.isEmpty()) {
            return "";
        }
        int lastDotIndex = fileName.lastIndexOf('.');
        if (lastDotIndex == -1) {
            return "";
        }
        return fileName.substring(lastDotIndex + 1).toLowerCase();

    }

}
