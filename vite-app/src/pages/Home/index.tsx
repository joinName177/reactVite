import React, { useState, useEffect, useCallback } from "react";
import "../../styles/pages/Home.less";
import { getMp4VideoAsync } from "../../utils/imageUtils";

const Home: React.FC = () => {
  const [mp4Video, setMp4Video] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("city");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loadMp4Video = useCallback(async (name: string) => {
    try {
      setIsLoading(true);
      const video = await getMp4VideoAsync(name);
      setMp4Video(video);
    } catch (error) {
      console.error("Failed to load video:", error);
      setMp4Video("");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMp4Video(activeTab);
  }, [activeTab, loadMp4Video]);

  const handleTabChange = useCallback((tab: string) => {
    setActiveTab(tab);
  }, []);

  return (
    <div className="home-container flex">
      <div className="home-left">
        <span 
          className={activeTab === "city" ? "active" : ""} 
          onClick={() => handleTabChange("city")}
        >
          City
        </span>
        <span 
          className={activeTab === "car" ? "active" : ""} 
          onClick={() => handleTabChange("car")}
        >
          Car
        </span>
      </div>
      <div className="home-right flex-1">
        {isLoading ? (
          <div className="loading-container">
            Loading video...
          </div>
        ) : (
          <video 
            className="video-container" 
            src={mp4Video} 
            autoPlay 
            loop 
            muted 
            playsInline
          />
        )}
      </div>
    </div>
  );
};

export default Home;
