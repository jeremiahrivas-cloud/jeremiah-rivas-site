const fs = require('fs');
let content = fs.readFileSync('src/components/SecurityLab.jsx', 'utf8');
const oldKey = `const SUPABASE_KEY = 'sb_publishable_nla4PYtTQL0ZMLaCp4rxiA_2hq_87eu';`;
const newKey = `const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNocmVtemp1ZnBzZHZ4dHd0aHBuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkwNzIwMTcsImV4cCI6MjA5NDY0ODAxN30.CMipvSsE2B35Di68Pr05ip2Fk858WycorSXKN4RVJq4';`;
if (content.includes(oldKey)) {
  content = content.replace(oldKey, newKey);
  fs.writeFileSync('src/components/SecurityLab.jsx', content, 'utf8');
  console.log('Key updated successfully');
} else {
  console.log('ERROR: old key not found in file');
}