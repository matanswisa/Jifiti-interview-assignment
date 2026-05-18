import styled, { keyframes } from "styled-components";

export const pulse = keyframes`
  0% { opacity: 0.55; }
  100% { opacity: 1; }
`;

export const Page = styled.main`
  width: min(1180px, calc(100vw - 48px));
  margin: 0 auto;
  padding: 40px 0 56px;

  @media (max-width: 720px) {
    width: min(100% - 24px, 1180px);
    padding: 24px 0 36px;
  }
`;

export const Hero = styled.section`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 22px;

  @media (max-width: 820px) {
    align-items: stretch;
    flex-direction: column;
  }
`;

export const Eyebrow = styled.div`
  color: #0f766e;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  margin-bottom: 8px;
  text-transform: uppercase;
`;

export const Title = styled.h1`
  color: #0f172a;
  font-size: clamp(2rem, 4vw, 3.6rem);
  line-height: 1;
  margin: 0;
`;

export const Subtitle = styled.p`
  color: #64748b;
  font-size: 1rem;
  line-height: 1.6;
  margin: 12px 0 0;
  max-width: 720px;
`;

export const Toolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 16px;

  @media (max-width: 720px) {
    align-items: stretch;
    flex-direction: column;
  }
`;

export const SearchInput = styled.input`
  width: min(360px, 100%);
  border: 1px solid #d7dee8;
  border-radius: 12px;
  color: #0f172a;
  background: #ffffff;
  outline: none;
  padding: 12px 14px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    border-color: #14b8a6;
    box-shadow: 0 0 0 4px rgba(20, 184, 166, 0.12);
  }
`;

export const BackButton = styled.button`
  border: 1px solid #d7dee8;
  border-radius: 12px;
  color: #0f172a;
  background: #ffffff;
  cursor: pointer;
  font-weight: 700;
  padding: 12px 14px;
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    border-color: #14b8a6;
    box-shadow: 0 10px 22px rgba(15, 23, 42, 0.08);
    transform: translateY(-1px);
  }
`;

export const StatGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  margin: 22px 0;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

export const StatCard = styled.article`
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.86);
  box-shadow: 0 18px 42px rgba(15, 23, 42, 0.06);
  padding: 18px;
`;

export const StatLabel = styled.div`
  color: #64748b;
  font-size: 0.82rem;
  font-weight: 700;
  margin-bottom: 8px;
  text-transform: uppercase;
`;

export const StatValue = styled.div`
  color: #0f172a;
  font-size: 1.8rem;
  font-weight: 800;
`;

export const TableCard = styled.section`
  overflow: hidden;
  border: 1px solid #dfe7ef;
  border-radius: 20px;
  background: #ffffff;
  box-shadow: 0 28px 70px rgba(15, 23, 42, 0.12);
`;

export const TableHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  border-bottom: 1px solid #edf2f7;
  padding: 18px 20px;
`;

export const TableTitle = styled.h2`
  color: #0f172a;
  font-size: 1.05rem;
  margin: 0;
`;

export const TableHint = styled.div`
  color: #64748b;
  font-size: 0.88rem;
`;

export const ScrollArea = styled.div`
  max-height: min(64vh, 680px);
  overflow: auto;

  &::-webkit-scrollbar {
    height: 10px;
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f5f9;
  }

  &::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 999px;
    border: 2px solid #f1f5f9;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 720px;
`;

export const THead = styled.thead`
  position: sticky;
  top: 0;
  z-index: 1;
`;

export const TBody = styled.tbody``;

export const Th = styled.th`
  background: #0f172a;
  color: #ffffff;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  padding: 15px 18px;
  text-align: left;
  text-transform: uppercase;
`;

export const Td = styled.td`
  border-top: 1px solid #eef2f7;
  color: #334155;
  font-size: 0.95rem;
  padding: 16px 18px;
`;

export const Tr = styled.tr<{ $clickable?: boolean }>`
  cursor: ${({ $clickable }) => ($clickable ? "pointer" : "default")};
  transition: background 0.18s ease;

  &:nth-child(even) {
    background: #fbfdff;
  }

  &:hover {
    background: ${({ $clickable }) => ($clickable ? "#ecfeff" : "inherit")};
  }
`;

export const Badge = styled.span<{ $tone?: "success" | "warning" | "danger" | "neutral" }>`
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  color: ${({ $tone }) => {
    if ($tone === "success") return "#047857";
    if ($tone === "warning") return "#92400e";
    if ($tone === "danger") return "#b91c1c";
    return "#475569";
  }};
  background: ${({ $tone }) => {
    if ($tone === "success") return "#d1fae5";
    if ($tone === "warning") return "#fef3c7";
    if ($tone === "danger") return "#fee2e2";
    return "#e2e8f0";
  }};
  font-size: 0.78rem;
  font-weight: 800;
  padding: 6px 10px;
`;

export const EmptyState = styled.div`
  color: #64748b;
  padding: 44px 20px;
  text-align: center;
`;

export const LoadingBar = styled.div`
  height: 16px;
  width: 100%;
  border-radius: 999px;
  background: linear-gradient(90deg, #e2e8f0, #f8fafc);
  animation: ${pulse} 0.8s ease-in-out infinite alternate;
`;
