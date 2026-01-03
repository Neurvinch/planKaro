import React, { useState } from 'react';
import { Search, Filter, MessageSquare, Heart, Share2, MapPin } from 'lucide-react';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Button from '../components/Button';
import ImageWithFallback from '../components/ImageWithFallback';

const CommunityPage = () => {
    const user = {
        name: "Alex",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
    };

    const communityPosts = [
        {
            id: 1,
            user: {
                name: "Sarah Chen",
                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
            },
            title: "Hidden Gems in Kyoto - A 3 Day Itinerary",
            image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800",
            likes: 124,
            comments: 45,
            location: "Kyoto, Japan",
            tags: ["Culture", "Food", "Solo Travel"]
        },
        {
            id: 2,
            user: {
                name: "Mike Ross",
                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike"
            },
            title: "Backpacking through Patagonia",
            image: "https://images.unsplash.com/photo-1518182170546-0766aa6ae693?auto=format&fit=crop&q=80&w=800",
            likes: 89,
            comments: 23,
            location: "Patagonia, Chile",
            tags: ["Adventure", "Hiking", "Nature"]
        },
        {
            id: 3,
            user: {
                name: "Priya Patel",
                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya"
            },
            title: "Best Street Food spots in Mumbai",
            image: "https://images.unsplash.com/photo-1572520779948-4e8c58253a6f?auto=format&fit=crop&q=80&w=800",
            likes: 256,
            comments: 78,
            location: "Mumbai, India",
            tags: ["Food", "City Guide"]
        },
        {
            id: 4,
            user: {
                name: "David Kim",
                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David"
            },
            title: "Iceland Ring Road Roadtrip",
            image: "https://images.unsplash.com/photo-1476610182048-b716b8518aae?auto=format&fit=crop&q=80&w=800",
            likes: 167,
            comments: 34,
            location: "Reykjavik, Iceland",
            tags: ["Road Trip", "Nature", "Photography"]
        }
    ];

    return (
        <div className="min-h-screen bg-cream">
            <Navbar user={user} />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-display font-bold text-text-dark">Community Stories</h1>
                    <p className="mt-2 text-text-light">Discover travel experiences from around the world</p>
                </div>

                {/* Search and Filter */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <div className="relative flex-1">
                        <input
                            type="text"
                            placeholder="Search stories, places..."
                            className="w-full pl-10 pr-4 py-3 bg-white border-none rounded-xl shadow-soft focus:ring-2 focus:ring-primary/20 text-sm"
                        />
                        <Search className="absolute left-3 top-3 h-5 w-5 text-text-light" />
                    </div>
                    <div className="flex gap-2 bg-white p-1 rounded-xl shadow-soft">
                        <button className="px-4 py-2 text-sm font-medium text-text-dark bg-sand/30 rounded-lg">All</button>
                        <button className="px-4 py-2 text-sm font-medium text-text-light hover:text-primary transition-colors">Popular</button>
                        <button className="px-4 py-2 text-sm font-medium text-text-light hover:text-primary transition-colors">Recent</button>
                    </div>
                    <Button variant="outline" className="flex items-center gap-2">
                        <Filter size={18} /> Filters
                    </Button>
                </div>

                {/* Community Feed */}
                <div className="space-y-8">
                    {communityPosts.map(post => (
                        <Card key={post.id} className="p-0 overflow-hidden hover:shadow-medium transition-shadow">
                            <div className="flex flex-col md:flex-row h-full">
                                {/* Image */}
                                <div className="md:w-2/5 h-48 md:h-auto relative">
                                    <ImageWithFallback
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute top-4 left-4 flex gap-2">
                                        {post.tags.map(tag => (
                                            <span key={tag} className="px-2 py-1 bg-black/40 backdrop-blur-md rounded-lg text-white text-[10px] font-medium">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 md:w-3/5 flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center gap-2 mb-3">
                                            <img src={post.user.avatar} alt={post.user.name} className="w-6 h-6 rounded-full" />
                                            <span className="text-xs font-medium text-text-light">{post.user.name}</span>
                                            <span className="text-xs text-text-light/50">• 2 days ago</span>
                                        </div>
                                        <h2 className="text-xl font-bold text-text-dark mb-2">{post.title}</h2>
                                        <div className="flex items-center text-sm text-text-light mb-4">
                                            <MapPin size={14} className="mr-1 text-primary" />
                                            {post.location}
                                        </div>
                                        <p className="text-text-light text-sm line-clamp-2 mb-4">
                                            Detailed itinerary covering the best hidden spots, local cafes, and cultural experiences...
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between pt-4 border-t border-sand/30">
                                        <div className="flex gap-4">
                                            <button className="flex items-center gap-1.5 text-sm text-text-light hover:text-accent transition-colors">
                                                <Heart size={16} /> {post.likes}
                                            </button>
                                            <button className="flex items-center gap-1.5 text-sm text-text-light hover:text-primary transition-colors">
                                                <MessageSquare size={16} /> {post.comments}
                                            </button>
                                        </div>
                                        <button className="text-text-light hover:text-primary transition-colors">
                                            <Share2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CommunityPage;
