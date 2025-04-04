import matplotlib.pyplot as plt

# Pie Chart - Who Benefits?
labels = ["Citizens (40%)", "Lawyers (25%)", "Government & Courts (20%)", "NGOs & Legal Aid (15%)"]
sizes = [40, 25, 20, 15]
colors = ["#ff9999","#66b3ff","#99ff99","#ffcc99"]

plt.figure(figsize=(6,6))
plt.pie(sizes, labels=labels, autopct='%1.0f%%', colors=colors, wedgeprops={'edgecolor': 'black'}, startangle=140)
plt.title("Who Benefits from the App?")
plt.show()

# Bar Chart - Key Impact Metrics
impact_labels = ["Reduction in Filing Errors", "Faster Legal Resolutions", "Access to Legal Services", "Increase in Awareness"]
impact_values = [80, 50, 100, 90]  # Using 100 as max scale for visualization

plt.figure(figsize=(8,5))
plt.barh(impact_labels, impact_values, color=['#4c72b0', '#55a868', '#c44e52', '#8172b2'])
plt.xlabel("Impact (%)")
plt.title("Key Impact Metrics of the App")
plt.xlim(0, 100)
plt.grid(axis='x', linestyle='--', alpha=0.5)
plt.show()
