/**
 * Chat Filter Tests
 * 
 * Tests content moderation for chat messages.
 */

import { describe, it, expect } from 'vitest';
import { filterMessage } from '../src/streaming/chatFilter';

describe('Chat Word Filter', () => {
    it('allows normal messages', () => {
        expect(filterMessage('Boa stream mano!').allowed).toBe(true);
        expect(filterMessage('Que jogada incrível 🔥').allowed).toBe(true);
        expect(filterMessage('Kwanza Stream é fixe').allowed).toBe(true);
    });

    it('blocks hate speech', () => {
        expect(filterMessage('macaco').allowed).toBe(false);
    });

    it('blocks scam URLs', () => {
        expect(filterMessage('Clica aqui bit.ly/abc123').allowed).toBe(false);
        expect(filterMessage('Free money at tinyurl.com/win').allowed).toBe(false);
    });

    it('blocks emoji spam (>10)', () => {
        expect(filterMessage('😂😂😂😂😂😂😂😂😂😂😂').allowed).toBe(false);
    });

    it('allows reasonable emojis', () => {
        expect(filterMessage('Boa! 🔥🔥🔥').allowed).toBe(true);
    });

    it('blocks character repetition spam', () => {
        expect(filterMessage('aaaaaaaaaa').allowed).toBe(false);
        expect(filterMessage('!!!!!!!!!!!').allowed).toBe(false);
    });

    it('blocks ALL CAPS abuse in long messages', () => {
        expect(filterMessage('ESTE STREAM É O MELHOR DO MUNDO INTEIRO E NINGUÉM ME VAI DIZER O CONTRÁRIO').allowed).toBe(false);
    });

    it('allows short caps (normal emphasis)', () => {
        expect(filterMessage('GOL!').allowed).toBe(true);
        expect(filterMessage('GG').allowed).toBe(true);
    });

    it('blocks empty messages', () => {
        expect(filterMessage('').allowed).toBe(false);
        expect(filterMessage('   ').allowed).toBe(false);
    });

    it('blocks messages over 500 chars', () => {
        const longMsg = 'a'.repeat(501);
        expect(filterMessage(longMsg).allowed).toBe(false);
    });

    it('provides reason on rejection', () => {
        const result = filterMessage('bit.ly/fake');
        expect(result.allowed).toBe(false);
        expect(result.reason).toBeDefined();
    });
});
