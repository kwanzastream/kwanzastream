declare module 'node-media-server' {
    interface NodeMediaServerConfig {
        rtmp: {
            port: number;
            chunk_size: number;
            gop_cache: boolean;
            ping: number;
            ping_timeout: number;
        };
        http?: {
            port: number;
            mediaroot: string;
            allow_origin: string;
        };
        trans?: {
            ffmpeg: string;
            tasks: Array<{
                app: string;
                hls?: boolean;
                hlsFlags?: string;
                hlsKeep?: boolean;
                dash?: boolean;
                mp4?: boolean;
                mp4Flags?: string;
            }>;
        };
        auth?: {
            play: boolean;
            publish: boolean;
            secret: string;
        };
    }

    interface Session {
        reject(): void;
        id: string;
    }

    class NodeMediaServer {
        constructor(config: NodeMediaServerConfig);
        run(): void;
        stop(): void;
        on(event: string, callback: (...args: any[]) => void): void;
        getSession(id: string): Session | undefined;
    }

    export = NodeMediaServer;
}
