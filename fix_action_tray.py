import os

filepath = 'src/app/(dashboard)/dashboard/page.tsx'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Update ActionTray definition
old_tray = """  const ActionTray = ({ accountId }: { accountId: string }) => {
    const actions = accountActions[accountId] ?? [];
    return (
      <div className={styles.actionTray}>
        {actions.map((a) => (
          <Link href={a.href} key={a.label} className={styles.actionTrayItem}>
            {a.icon}
            <span style={{ whiteSpace: 'pre-line' }}>{a.label}</span>
          </Link>
        ))}
      </div>
    );
  };"""

new_tray = """  const ActionTray = ({ accountId, actualId }: { accountId: string, actualId: string }) => {
    const actions = accountActions[accountId] ?? [];
    return (
      <div className={styles.actionTray}>
        {actions.map((a) => {
          let targetHref = a.href;
          if (a.label.includes('Statements')) {
            targetHref = `/account/${actualId}`;
          }
          return (
            <Link href={targetHref} key={a.label} className={styles.actionTrayItem}>
              {a.icon}
              <span style={{ whiteSpace: 'pre-line' }}>{a.label}</span>
            </Link>
          );
        })}
      </div>
    );
  };"""

content = content.replace(old_tray, new_tray)

# Update <ActionTray accountId="prime" /> to <ActionTray accountId="prime" actualId={acc.id} />
content = content.replace('<ActionTray accountId="prime" />', '<ActionTray accountId="prime" actualId={acc.id} />')
content = content.replace('<ActionTray accountId="home" />', '<ActionTray accountId="home" actualId={acc.id} />')
content = content.replace('<ActionTray accountId="flex" />', '<ActionTray accountId="flex" actualId={acc.id} />')

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("ActionTray fixed.")
