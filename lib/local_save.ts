import { imageType } from "@/redux/types";
import { debounce } from "lodash";

async function saveImagesLocally(images: imageType[]) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("images", 1);

    request.onsuccess = function (event) {};

    request.onerror = function (event) {
      console.log("Error saving image to indexedDB");
    };

    request.onupgradeneeded = function (event: any) {
      const db = event.target.result;
      if (db.objectStoreNames.contains("images")) return;

      const objectStore = db.createObjectStore("images", {
        keyPath: "timestamp",
      });
      objectStore.createIndex("timestamp", "timestamp", { unique: true });
    };

    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      const transaction = db.transaction("images", "readwrite");
      const objectStore = transaction.objectStore("images");
      objectStore.clear();
      images.forEach((img) => {
        objectStore.add(img);
      });

      transaction.oncomplete = () => {
        console.log("Image saved successfully!");
        resolve(true);
      };

      transaction.onerror = (err) => {
        console.log("Error saving image to indexedDB");
        reject(err);
      };
    };
  });
}

export async function getLocalImages() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("images", 1);
    request.onsuccess = function (event) {
      console.log("Success opening indexedDB");
    };

    request.onerror = function (event) {
      console.log("Error getting images from indexedDB");
      reject(new Error("Error getting images from indexedDB"));
    };

    request.onupgradeneeded = function (event: any) {
      const db = event.target.result;
      if (db.objectStoreNames.contains("images")) return;

      const objectStore = db.createObjectStore("images", {
        keyPath: "timestamp",
      });
      objectStore.createIndex("timestamp", "timestamp", { unique: true });
    };

    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      const transaction = db.transaction("images", "readonly");
      const objectStore = transaction.objectStore("images");
      const req = objectStore.getAll();

      req.onsuccess = (event) => {
        const localImages = (event.target as IDBRequest).result;
        console.log("Images retrieved successfully!");
        resolve(localImages);
      };

      req.onerror = () => {
        console.log("Error getting images from indexedDB");
        reject(new Error("Error getting images from indexedDB"));
      };
    };
  });
}

export async function clearLocalImages() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("images", 1);

    request.onerror = function () {
      reject(new Error("Error opening indexedDB"));
    };

    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      const transaction = db.transaction("images", "readwrite");
      const objectStore = transaction.objectStore("images");
      objectStore.clear();

      transaction.oncomplete = () => {
        console.log("Images cleared successfully!");
        resolve(true);
      };

      transaction.onerror = (err) => {
        console.log("Error clearing images from indexedDB");
        reject(err);
      };
    };
  });
}

export const debouncedSaveImagesLocally = debounce(saveImagesLocally, 1000);
