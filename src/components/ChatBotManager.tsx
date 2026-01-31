'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import FloatingCoffee from './FloatingCoffee';
import ChatBotModal from './ChatBotModal';

const ChatBotManager = () => {
  const pathname = usePathname();
  const [showMainChatModal, setShowMainChatModal] = useState(false);

  // Only show floating coffee on homepage
  const isHomePage = pathname === '/';

  const handleCloseMainChat = () => {
    setShowMainChatModal(false);
  };

  // Function to be called from coffee cup (opens main chat directly)
  const openMainChatDirectly = () => {
    setShowMainChatModal(true);
  };

  // Make these functions available globally
  if (typeof window !== 'undefined') {
    (window as any).openStudioAssistant = openMainChatDirectly;
  }

  return (
    <>
      {/* Floating Coffee Cup - Only show on homepage */}
      {isHomePage && <FloatingCoffee />}

      {/* Main Studio Assistant Modal */}
      <ChatBotModal
        isOpen={showMainChatModal}
        onClose={handleCloseMainChat}
      />
    </>
  );
};

export default ChatBotManager;
